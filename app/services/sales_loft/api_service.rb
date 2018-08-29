module SalesLoft
  class ApiService
    include HTTParty
    format :json

    class RequestFailed < StandardError; end

    HTTP_ERRORS = [
      EOFError,
      Errno::ECONNREFUSED,
      Errno::ECONNRESET,
      Errno::EINVAL,
      HTTParty::Error,
      JSON::ParserError,
      Net::HTTPBadResponse,
      Net::HTTPHeaderSyntaxError,
      Net::ProtocolError,
      Net::ReadTimeout,
      SocketError,
      Timeout::Error
    ].freeze

    def initialize(
      base_uri: ENV.fetch('SALESLOFT_API_URL'),
      key: ENV.fetch('SALESLOFT_API_KEY'),
      **options
    )
      @uri = build_uri(base_uri)
      @key = key
      @options = options.merge base_uri: @uri.to_s
    end

    %i[delete get post put].each do |http_method|
      define_method http_method do |path, **options, &block|
        make_request \
          http_method: http_method, path: path, options: options,
          &block
      end
    end

    private

    def make_request(http_method:, path:, options:, &block)
      self.class.send(
        http_method,
        path,
        [@options, headers, options].reduce(&:deep_merge),
        &block
      ).tap(&:inspect) # capture JSON parsing errors
    rescue *HTTP_ERRORS => e
      error = RequestFailed.new "#{e.class}: #{e.message}"
      error.set_backtrace e.backtrace
      raise error
    end

    def build_uri(uri)
      URI(HTTParty.normalize_base_uri(uri))
    end

    def headers
      { headers: { Authorization: "Bearer #{@key}" } }
    end
  end
end

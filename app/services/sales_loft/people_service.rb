module SalesLoft
  class PeopleService
    attr_reader :client

    Result = Struct.new :json, :status

    def initialize
      @client = ApiService.new
    end

    def get_all
      json, page = [], 1
      loop do
        data, page = get_page page
        json.concat data if data.present?
        break if page.blank?
      end
      json = PeopleSerializer.new(json).serializable_hash
      Result.new json, :ok
    rescue ApiService::RequestFailed => error
      json = { error: error.message }
      Result.new json, :bad_request
    end

    private

    def get_page(page)
      response = client.get \
        '/v2/people',
        query: { per_page: 100, include_paging_counts: true, page: page }
      parsed = JSON.parse response.body
      [
        parsed.dig('data') || [],
        parsed.dig('metadata', 'paging', 'next_page')
      ]
    end
  end
end

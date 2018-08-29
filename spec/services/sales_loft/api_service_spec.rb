RSpec.describe SalesLoft::ApiService do
  let(:base_uri) { 'api.salesloft.com' }
  let(:api_key) { 'lolwut' }
  subject(:client) { SalesLoft::ApiService.new(base_uri: base_uri, key: api_key) }

  it { is_expected.to be_a HTTParty } # never gets old! party time ya'll!1!

  RSpec.shared_examples 'request' do |http_method|
    let(:request_path) { '/v2/people' }

    it { is_expected.to respond_to(http_method) }

    it 'dynamically delegates the request' do
      expect(client.class).to receive(http_method).once
      client.send(http_method, request_path)
    end

    it 'includes base uri' do
      expect(client.class).to receive(http_method).once.with \
        request_path,
        a_hash_including(base_uri: "http://#{base_uri}")

      client.send(http_method, request_path)
    end

    it 'includes correct Authorization headers option' do
      expect(client.class).to receive(http_method).once.with \
        request_path,
        a_hash_including(headers: { Authorization: "Bearer #{api_key}" })

      client.send(http_method, request_path)
    end

    it 'rescues from network errors and raises RequestFailed' do
      expect(client.class).to receive(http_method).and_raise(Errno::ECONNREFUSED)
      expect do
        client.send(http_method, request_path)
      end.to raise_error(SalesLoft::ApiService::RequestFailed)
    end

    it 'includes a provided block' do
      block = proc {}

      expect(client.class).to receive(http_method).once.with \
        request_path,
        a_kind_of(Hash),
        &block

      client.send(http_method, request_path, &block)
    end
  end

  describe 'delete' do
    include_examples 'request', :delete
  end

  describe 'get' do
    include_examples 'request', :get
  end

  describe 'post' do
    include_examples 'request', :post
  end

  describe 'put' do
    include_examples 'request', :put
  end
end


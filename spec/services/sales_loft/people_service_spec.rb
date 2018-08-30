RSpec.describe SalesLoft::PeopleService do
  subject(:service) { SalesLoft::PeopleService.new }

  describe 'client' do
    it { is_expected.to respond_to(:client) }
    its(:client) { is_expected.to be_a(SalesLoft::ApiService) }
  end

  describe 'get_all' do
    it { is_expected.to respond_to(:get_all) }

    context 'success' do
      before do
        expect(SalesLoft::PeopleSerializer)
          .to receive(:new)
          .once
          .and_call_original
        expect(service.client)
          .to receive(:get)
          .twice
          .and_return \
            double(
              body: { data: [{}], metadata: { paging: { next_page: 2 } } }.to_json
            ),
            double(
              body: { data: [{}], metadata: { paging: { next_page: nil } } }.to_json
            )
      end

      it 'returns success result' do
        result = service.get_all
        expect(result).to be_a SalesLoft::PeopleService::Result
        expect(result.json).to be_present
        expect(result.status).to eq :ok
      end
    end

    context 'failure' do
      before do
        expect(service.client)
          .to receive(:get)
          .and_raise(SalesLoft::ApiService::RequestFailed, 'oops')
      end

      it 'returns failure result' do
        result = service.get_all
        expect(result).to be_a(SalesLoft::PeopleService::Result)
        expect(result.json).to eq error: 'oops'
        expect(result.status).to eq :bad_request
      end
    end
  end
end

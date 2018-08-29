RSpec.describe Api::PeopleController do
  describe '#index' do
    let(:result) do
      OpenStruct.new(json: [{ 'first_name' => 'Jeff Belser' }], status: :ok)
    end

    before do
      people_service_double = double
      expect(people_service_double)
        .to receive(:get_all)
        .once
        .and_return(result)
      expect(SalesLoft::PeopleService)
        .to receive(:new)
        .once
        .and_return(people_service_double)
    end

    context 'success' do
      subject { get :index }
      it { is_expected.to be_success }
      its(:body) { is_expected.to include('Jeff Belser') }
      its(:content_type) { is_expected.to eq('application/json') }
    end

    context 'failure' do
      let(:result) do
        OpenStruct.new(json: { 'error' => 'oops!' }, status: :bad_request)
      end
      subject { get :index }

      it { is_expected.to be_bad_request }
      its(:body) { is_expected.to include('oops!') }
      its(:content_type) { is_expected.to eq('application/json') }
    end
  end
end

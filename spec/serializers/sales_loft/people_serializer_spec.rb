RSpec.describe SalesLoft::PeopleSerializer do
  let(:raw_records) do
    [
      {'id' => 101694867,'created_at' => '2018-03-13T00:59:08.523837-04:00','updated_at' => '2018-03-13T00:59:08.523837-04:00','last_contacted_at' => nil,'last_replied_at' => nil,'first_name' => 'Marisa','last_name' => 'Casper','display_name' => 'Marisa Casper','email_address' => 'isnaoj_nathz@ihooberbrunner.net','secondary_email_address' => nil,'personal_email_address' => nil,'phone' => '1-848-896-8898','phone_extension' => nil,'home_phone' => nil,'mobile_phone' => nil,'linkedin_url' => nil,'title' => 'Direct Security Representative','city' => 'West Cooper','state' => 'Pennsylvania','country' => 'Namibia','work_city' => nil,'work_state' => nil,'work_country' => nil,'crm_url' => nil,'crm_id' => nil,'crm_object_type' => nil,'owner_crm_id' => nil,'person_company_name' => nil,'person_company_website' => 'http://ihooberbrunner.net','person_company_industry' => nil,'do_not_contact' => false,'bouncing' => false,'locale' => nil,'personal_website' => nil,'twitter_handle' => nil,'last_contacted_type' => nil,'custom_fields' => {},'tags' => [],'contact_restrictions' => [],'counts' => {'emails_sent' => 0,'emails_viewed' => 0,'emails_clicked' => 0,'emails_replied_to' => 0,'emails_bounced' => 0,'calls' => 0},'account' => {'_href' => 'https://api.salesloft.com/v2/accounts/37127808','id' => 37127808},'owner' => {'_href' => 'https://api.salesloft.com/v2/users/46818','id' => 46818},'last_contacted_by' => nil,'import' => nil,'person_stage' => nil},
      {'id' => 101694794,'created_at' => '2018-03-13T00:55:59.446755-04:00','updated_at' => '2018-03-13T00:55:59.446755-04:00','last_contacted_at' => nil,'last_replied_at' => nil,'first_name' => 'Griffin','last_name' => 'Hand','display_name' => 'Griffin Hand','email_address' => 'mamixe@lindgren.info','secondary_email_address' => nil,'personal_email_address' => nil,'phone' => '1-326-697-7001 x317','phone_extension' => nil,'home_phone' => nil,'mobile_phone' => nil,'linkedin_url' => nil,'title' => 'International Usability Agent','city' => 'Vonmouth','state' => 'Iowa','country' => 'Egypt','work_city' => nil,'work_state' => nil,'work_country' => nil,'crm_url' => nil,'crm_id' => nil,'crm_object_type' => nil,'owner_crm_id' => nil,'person_company_name' => nil,'person_company_website' => 'http://lindgren.info','person_company_industry' => nil,'do_not_contact' => false,'bouncing' => false,'locale' => nil,'personal_website' => nil,'twitter_handle' => nil,'last_contacted_type' => nil,'custom_fields' => {},'tags' => [],'contact_restrictions' => [],'counts' => {'emails_sent' => 0,'emails_viewed' => 0,'emails_clicked' => 0,'emails_replied_to' => 0,'emails_bounced' => 0,'calls' => 0},'account' => {'_href' => 'https://api.salesloft.com/v2/accounts/37127814','id' => 37127814},'owner' => {'_href' => 'https://api.salesloft.com/v2/users/46818','id' => 46818},'last_contacted_by' => nil,'import' => nil,'person_stage' => nil}
    ]
  end

  subject { SalesLoft::PeopleSerializer.new(raw_records) }

  describe 'serialization' do
    its(:serializable_hash) do
      is_expected.to match({
        'people' => [
          { 'id' => 101694867, 'displayName' => 'Marisa Casper', 'emailAddress' => 'isnaoj_nathz@ihooberbrunner.net', 'title' => 'Direct Security Representative' },
          { 'id' => 101694794, 'displayName' => 'Griffin Hand', 'emailAddress' => 'mamixe@lindgren.info', 'title' => 'International Usability Agent' }
        ]
      })
    end
  end
end

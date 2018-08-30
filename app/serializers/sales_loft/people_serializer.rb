module SalesLoft
  class PeopleSerializer

    def initialize(people)
      @people = Array(people)
    end

    def serializable_hash
      attributes = %w(id display_name email_address title)
      {}.tap do |hash|
        hash['people'] = @people.map do |person|
          person.slice(*attributes).transform_keys do |key|
            key.camelize(:lower)
          end
        end
      end
    end
  end
end

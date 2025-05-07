require "test_helper"

class IntroControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get intro_index_url
    assert_response :success
  end
end

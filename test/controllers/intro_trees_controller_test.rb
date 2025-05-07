require "test_helper"

class IntroTreesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get intro_trees_index_url
    assert_response :success
  end
end

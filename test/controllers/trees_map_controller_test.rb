require "test_helper"

class TreesMapControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get trees_map_index_url
    assert_response :success
  end
end

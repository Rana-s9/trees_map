require "test_helper"

class MapTreesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get map_trees_url
    assert_response :success
  end
end

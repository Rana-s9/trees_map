require "test_helper"

class AllTreesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get all_trees_index_url
    assert_response :success
  end
  
  test "should get show" do
    get all_trees_show_url
    assert_response :success
  end

  test "should get edit" do
    get all_trees_edit_url
    assert_response :success
  end
end

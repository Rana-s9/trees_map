require "test_helper"

class MyTreesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get my_trees_index_url
    assert_response :success
  end

  test "should get show" do
    get my_trees_show_url
    assert_response :success
  end

  test "should get edit" do
    get my_trees_edit_url
    assert_response :success
  end
end

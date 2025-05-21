require "test_helper"

class MyTreesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  def setup
    @user = User.create!(user_name: "TestUserThree", email: "test3@example.com", password: "password3")
    @tree = Tree.create!(user: @user, tree_name: "My Tree3", position_x: 2000, position_y: 0, position_z: 3000)
    sign_in @user
  end

  test "should get index" do
    get my_trees_url
    assert_response :success
  end

  test "should get show" do
    get my_tree_url(@tree)
    assert_response :success
  end

  test "should get edit" do
    get edit_my_tree_url(@tree)
    assert_response :success
  end
end

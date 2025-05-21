require "test_helper"

class AllTreesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get fav_places_url
    assert_response :success
  end

  test "should get show" do
    get fav_place_url(fav_places(:one))
    assert_response :success
  end

  test "should get edit" do
    get new_fav_place_url
    assert_response :success
  end
end

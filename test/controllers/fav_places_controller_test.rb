require "test_helper"

class FavPlacesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get fav_places_index_url
    assert_response :success
  end

  test "should get new" do
    get fav_places_new_url
    assert_response :success
  end

  test "should get show" do
    get fav_places_show_url
    assert_response :success
  end
end

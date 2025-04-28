class FavPlacesController < ApplicationController
  def index
    @fav_places = FavPlace.all.order(created_at: :desc)
  end

  def new
    @fav_place = FavPlace.new
    @fav_places = FavPlace.all.order(fav_name: :asc)
  end

  def show
    @fav_place = FavPlace.find(params[:id])
  end

  def create
    @fav_place = current_user.fav_places.build(fav_place_params) # ←これが必要！
    # 緯度・経度が空の場合だけGeocoderを使う
    if @fav_place.latitude.blank? || @fav_place.longitude.blank?
      result = Geocoder.search(@fav_place.address).first
      if result
        @fav_place.latitude = result.latitude
        @fav_place.longitude = result.longitude
      end
    end

    if @fav_place.save
      respond_to do |format|
        format.html { redirect_to fav_places_path, notice: '保存しました' }
        # format.turbo_stream
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def fav_place_params
    params.require(:fav_place).permit(:fav_name, :address, :fav_x, :fav_y, :fav_z, :latitude, :longitude)
  end
end


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
    if current_user.fav_places.count >= 10
      flash[:alert] = "1人あたり10のエリアまで登録できます。"
      redirect_to new_fav_place_path and return
    end

    @fav_place = current_user.fav_places.build(fav_place_params)
    @fav_places = FavPlace.all.order(fav_name: :asc)
    if @fav_place.latitude.blank? || @fav_place.longitude.blank?
      result = Geocoder.search(@fav_place.address).first
      if result
        @fav_place.latitude = result.latitude
        @fav_place.longitude = result.longitude
      end
    end

    if @fav_place.save
      respond_to do |format|
        format.html { redirect_to new_fav_place_path, notice: "登録しました" }
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @fav_place = FavPlace.find(params[:id])
    if @fav_place.destroy
      redirect_to fav_places_path, notice: "場所の削除に成功しました"
    else
      render :index, alert: "場所削除に失敗しました", status: :unprocessable_entity
    end
  end

  private

  def fav_place_params
    params.require(:fav_place).permit(:fav_name, :address, :fav_x, :fav_y, :fav_z, :latitude, :longitude)
  end
end

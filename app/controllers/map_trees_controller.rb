class MapTreesController < ApplicationController
  def create
    tree_params = params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z, :fav_place_id)

    if current_user.trees.count >= 10
      respond_to do |format|
        format.html do
          flash[:alert] = "1人あたり10本までしか木を植えられません。"
          redirect_to map_trees_path
        end
        format.json do
          render json: { status: "error", message: "1人あたり10本までしか木を植えられません。" }, status: :forbidden
        end
      end
      return
    end

    # 新しい木を作成
    @tree = current_user.trees.new(tree_params)
    fav_names = current_user.fav_places.pluck(:fav_name)
      if @tree.save
        # 保存成功時の処理
        render json: { status: "success", tree: @tree.as_json, user_name: current_user.user_name, fav_names: fav_names, trees_count: Tree.count, tree_count: current_user.trees.count  }, status: :created
      else
        # 保存失敗時の処理
        render json: { status: "error", errors: @tree.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def index
    @trees = Tree.includes(:user, :fav_place).map do |tree|
      tree.as_json.merge(
        user_name: tree.user.user_name,
        fav_name: tree.fav_place&.fav_name,
        fav_x: tree.fav_place&.fav_x,
        fav_y: tree.fav_place&.fav_y,
        latitude: tree.fav_place&.latitude,
        longitude: tree.fav_place&.longitude
        )
    end

    @trees_count = Tree.count

    if current_user
      @tree_count = current_user.trees.count

      @trees_id_name = []

      trees = current_user.trees.includes(:fav_place).order(:created_at)

      trees.each do |tree|
        tree_name = tree.tree_name
        fav_place = tree.fav_place
        fav_name = fav_place.present? ? fav_place.fav_name : nil

        @trees_id_name << { tree: tree_name, fav: fav_name }
      end
    end
  end

  private

  def tree_params
    params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z, :fav_place_id)
  end
end

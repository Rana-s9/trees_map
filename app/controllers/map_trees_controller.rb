class MapTreesController < ApplicationController
  def create
    tree_params = params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z, :fav_place_id)

    if current_user.trees.count >= 10
      flash[:alert] = "1人あたり10本までしか木を植えられません。"
      redirect_to planting_trees_path and return
    end

    # 新しい木を作成
    @tree = current_user.trees.new(tree_params)
      if @tree.save
      # 保存成功時の処理
      puts @tree.inspect
      puts current_user.fav_place&.fav_name
        render json: { status: 'success', tree: @tree, user_name: current_user.user_name, fav_name: current_user.fav_places&.fav_name }, status: :created
      else
      # 保存失敗時の処理
        render json: { status: 'error', errors: @tree.errors.full_messages }, status: :unprocessable_entity
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
      @trees_id_name = current_user.trees.order(created_at: :asc).map do |tree|
        {
          tree: tree.tree_name,
          fav: tree.fav_place&.fav_name
      }
      end
    else
      @trees_id_name = []
    end
  end

  private

  def tree_params
    params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z, :fav_place_id)
  end
end

class MyTreesController < ApplicationController
  def index
      @trees = current_user.trees.includes(:user).order(created_at: :desc)
  end

  def show
      @tree = Tree.find(params[:id])
  end

  def edit
      @tree = Tree.find(params[:id])
  end

  def update
      @tree = Tree.find(params[:id])
      if @tree.update(tree_params)
          redirect_to my_trees_path, notice: "あなたの木に命名しました"
      else
          render :edit, alert: "木の命名に失敗しました", status: :unprocessable_entity
      end
  end

  def destroy
    @tree = Tree.find(params[:id])
    if @tree.destroy
      redirect_to my_trees_path, notice: "木の削除に成功しました"
    else
      render :edit, alert: "木の削除に失敗しました", status: :unprocessable_entity
    end
  end

  private

  def tree_params
      params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z)
  end
end

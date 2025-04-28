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
          flash[:error] = @tree.errors.full_messages.to_sentence
          render :edit
      end
  end

  def destroy
    @tree = current_user.trees.find(params[:id])
    if @tree.destroy
      redirect_to my_trees_path, notice: "木を削除しました"
    else
      redirect_to my_trees_path, alert: "削除に失敗しました"
    end
  end
  
  private
  
  def tree_params
      params.require(:tree).permit(:tree_name, :position_x, :position_y, :position_z)
  end
end

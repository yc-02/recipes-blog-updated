export type userLikedType={
    id: number
    user_id: string
    recipe_id: number
    created_at: Date
}

export type RecipeType = {
    id: number;
    recipe_name:string;
    directions:string;
    time_used: number;
    user_id:string;
    created_at:Date;
    image_path:string;
    file_path:string;
    ingredients:string;
    likes: userLikedType[][],
    userLiked: userLikedType[],
    likesCount: number 
}
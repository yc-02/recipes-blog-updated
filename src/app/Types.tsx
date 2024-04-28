export type LikesSupabaseDataType={
    id: number
    user_id: string
    recipe_id: string
    created_at: Date
}

export type RecipeCardType = {
    id: string
    recipe_name:string;
    directions:string;
    time_used: number;
    user_id:string;
    created_at:Date;
    image_path:string;
    file_path:string;
    ingredients:string;
    likes?: LikesSupabaseDataType[],
    userLiked: LikesSupabaseDataType,
    likesCount: number 
}


export type RecipesSupabaseDataType ={
    id:string
    user_id:string
    file_path:string
    time_used:number
    created_at:Date
    directions:string
    image_path:string
    ingredients:string
    recipe_name:string
    username:string
}

export type FavoriteDataType={
    id:number
    created_at:Date
    user_id:string
    recipe_id:string
    recipes:RecipesSupabaseDataType
}

export type SignupDataType = {
    email:string;
    password:string;
    first_name:string;
    last_name:string;
    username:string;
  }
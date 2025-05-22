import React from "react";

const PostCard = () => {
  return (
    <div>
      <div className='card text-black w-96 rounded-xl bg-orange-200'>
        <div className='card-body'>
            <h2 className='card-title'>Card title!</h2>
            

          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className='card-actions justify-between mt-2'>
            <button className="btn btn-neutral w-14 h-8">Delete</button>
            
            <div className="flex justify-between gap-4">
            <button className='btn btn-success w-14 h-8'>Like</button>
            <button className='btn btn-error w-14 h-8'>Dislike</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

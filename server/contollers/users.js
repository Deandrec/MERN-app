import User from "../models/User.js";

/* READ */
export const getUser = async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user) // send to frontend user information
    }catch (err){
        res.status(404).json({error: err.message});
    }
}

export const getUserFriends = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        // use a promise because there are multiple calls to the database
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )

        // format for frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
            )
        
        res. status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({error: err.message})
    }   
}

/* update */
export const addRemoveFriend = async (req,res)=>{
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId); 
            friend.friends = user.friends.filter((id)=> id !== id)
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // save changes
        await user.save();
        await friend.save();

        // get updated friends list 
         // use a promise because there are multiple calls to the database
         const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )

        // format for frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
            )
        
        res.status(200).json(formattedFriends)
        
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}
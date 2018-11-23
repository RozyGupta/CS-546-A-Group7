const mongoCollections = require("../config/mongoCollections");
const workoutActivity = mongoCollections.workoutActivity;
const userWorkout = mongoCollections.userWorkout;
const uuid = require('uuid/v1');

const exportedMethods = {
    async addActivity(activity, weight, repetitions) {
        if (!activity) throw "No activity provided";
        if (!weight) throw "No weight provided!";
        if (!repetitions) throw "No repetitions provided";
        
        const workoutActivityCollection = await workoutActivity();
       

        const newactivity = {
            _id: uuid(),
            activity: activity,
            weight: weight,
            repetitions: repetitions,
        };

        
        const addedactivity = await workoutActivityCollection.insertOne(newactivity);
        if (addedactivity.insertedCount === 0) {
            throw "Could not add activity successfully";
        }
        const newId  = addedactivity.insertedId;
        return {
            status: true,
            addedactivity,
            newId
        }
    },
    async addUserActivity(userId,activityId) {
        if (!userId) throw "No userId provided";
        if (!activityId) throw "No activityId provided!";
        
        
        const userWorkoutCollection = await userWorkout();

        const newUserActivity = {
            
            userId: userId,
            activityId: activityId,
            
        };

        
        const addedUserWorkout = await userWorkoutCollection.insertOne(newUserActivity);
        if (addedUserWorkout.insertedCount === 0) {
            throw "Could not add user and activity id  successfully";
        }
        //const newId  = addeduser.insertedId;
        return {
            status: true,
            addedUserWorkout,
        }
    },

    async removeActivity(activityId) {
        if (!activityId) throw "You must provide an id to delete";
       
        const workoutCollection = await workoutActivity();
       
        const removeActivity = await workoutCollection.removeOne({ _id: activityId });
    
        if (removeActivity.deletedCount === 0) {
          throw `Could not delete activity with id: ${activityId}`;
        }
      },
      async removeUserActivity(userId,activityId) {
        if (!userId) throw "You must provide an id to delete";
        if (!activityId) throw "You must provide an id to delete";
    
        const userWorkoutCollection = await userWorkout();

        // const activiytToDelete = {
        //     userId: userId,
        //     activityId: activityId
        // }
        const removeActivity = await userWorkoutCollection.removeOne({ userId:userId,activityId: activityId});
    
        if (removeActivity.deletedCount === 0) {
          throw `Could not delete activity with id: ${activityId}`;
        }
      },
}
module.exports = exportedMethods;
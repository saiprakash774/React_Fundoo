export const SET_SNACKBAR="teamly/setting/SET_SNACKBAR";

const initialState={
    snackbarOpen:false,
    snackbarType:"success",
    snackbarMsg:""
};

export default (state=initialState,action)=>{
    switch(action.type){
        case SET_SNACKBAR:
        const {snackbarOpen,snackbarMsg,snackbarType}=action;
        return{
         ...state,
         snackbarOpen,
         snackbarType,
         snackbarMsg
        };
        default:
        return state;
    }
};

export const setSnackbar=(
    snackbarOpen,
    snackbarType="success",
    snackbarMsg=""
                )=>({
    type:SET_SNACKBAR,
    snackbarOpen,
    snackbarType
});
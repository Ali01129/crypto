import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { SERVERURL } from "../ServerUrl";
import Swal from 'sweetalert2'
import Cookies from "universal-cookie";



const cookies = new Cookies();

const initialStateFunction = () => ({


  userDataAdmins:[],
  getAmbassadorsData:[],
  getPartnersData:[]


});




//register ambassador
export const registerAmbassador = createAsyncThunk("registerAmbassador", async ({form,ambassadorData}) => {
  let Array=[...ambassadorData];
  try {
    const data1 = await axios.post(`${SERVERURL}/register/ambassador`, form);

  
    Array.push(data1?.data?.ambassador);
    console.log("data1AddBlog",data1)
    Swal.fire(
      data1?.data?.success?'Successfully':'Failed',
      data1?.data?.message,
      data1?.data?.success?'success':'error'
    )
    return Array;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});
//Add Partner
export const addPartner = createAsyncThunk("addPartner", async ({data,getPartnersData}) => {
  let Array=[...getPartnersData];
  try {
    const data1 = await axios.post(`${SERVERURL}/admin/add/partners`, data);

  
    Array.push(data1?.data?.partner);
    console.log("data1AddBlog",data1)
    Swal.fire(
      data1?.data?.success?'Successfully':'Failed',
      data1?.data?.message,
      data1?.data?.success?'success':'error'
    )
    return Array;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});
//get parners
export const getPartners = createAsyncThunk("getPartners", async (id) => {

  try {
    const data1 = await axios.get(`${SERVERURL}/admin/partners`);

    console.log("data1Response",data1.data.partners)
   
    return data1.data.partners;
  } catch (err) {
    console.log(err);
  }
});

//login customer
export const loginCustomer = createAsyncThunk("loginCustomer", async (data) => {

  try {
    const data1 = await axios.post(`${SERVERURL}/login`, data);

    cookies.set("_id", data1?.data?.user?._id, { path: "/" });

    //   cookies.set("userType",data1?.data?.user?.userType,{ path: '/' });
    cookies.set("token", data1?.data?.token, { path: "/" });
    // cookies.set('token', response?.data?.token, { path: '/' })
 console.log("data1",data1)
    return data1;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});

//login admin
export const loginAdmin = createAsyncThunk("loginAdmin", async (data) => {

  try {
    const data1 = await axios.post(`${SERVERURL}/admin/login`, data);

    cookies.set("_id", data1?.data?.user?._id, { path: "/" });

    //   cookies.set("userType",data1?.data?.user?.userType,{ path: '/' });
    cookies.set("tokenAdmin", data1?.data?.token, { path: "/" });
 
    return data1;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});
//verify code
export const verifyCode = createAsyncThunk("verifyCode", async (data) => {

  try {
    const data1 = await axios.post(`${SERVERURL}/verifyCode`, data);

   
 console.log("Veridydata1",data1)
    return data1;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});

//get users
export const getUsers = createAsyncThunk("getUsers", async (data) => {
  try {
    const data1 = await axios.get(`${SERVERURL}/users`);

    console.log("data1Response",data1.data.customers)
   
    return data1.data.customers;
  } catch (err) {
    console.log(err);
  }
});


//update updateMetaTag
export const UpdateUser = createAsyncThunk("UpdateUser", async ({form,id,userData}) => {
  // console.log("check", detail);
  let Array=[...userData];
  try {
    // console.log("ArrayUpdateBefore",Array);
    const data1 = await axios.put(
      `${SERVERURL}/admin/update/user/${id}`,
      form
    );

    console.log("data1Update",data1?.data?.data._id);
    console.log("data1Update",data1?.data?.data);
    console.log("ArrayUpdate",Array);

    let index = 0;
    userData?.map((item, i) => {
      if (item?._id === data1?.data?.data?._id) {
        index = i;
        console.log("indexResult", index);
      }
    });
    console.log("DataResDataRes",data1?.data?.data?._id);
    console.log("DataResDataRes",data1?.data?.data);

    

        Array.splice(index, 1,data1?.data?.data);
        console.log("ArrayUpdateAfterSplice",Array);
        Swal.fire(
          'Good',
          data1?.data?.message,
          'success'
        )
    return Array;
  } catch (err) {
    console.log("NoLoginError", err?.response?.data?.message);
  }
});
//update Ambassador
export const UpdateAmbassador = createAsyncThunk("UpdateAmbassador", async ({form,id,userData}) => {
  // console.log("check", detail);
  let Array=[...userData];
  try {
    // console.log("ArrayUpdateBefore",Array);
    const data1 = await axios.put(
      `${SERVERURL}/admin/update/ambassador/${id}`,
      form
    );

    console.log("data1Update",data1?.data?.data._id);
    console.log("data1Update",data1?.data?.data);
    console.log("ArrayUpdate",Array);

    let index = 0;
    userData?.map((item, i) => {
      if (item?._id === data1?.data?.data?._id) {
        index = i;
        console.log("indexResult", index);
      }
    });
    console.log("DataResDataRes",data1?.data?.data?._id);
    console.log("DataResDataRes",data1?.data?.data);

    

        Array.splice(index, 1,data1?.data?.data);
        console.log("ArrayUpdateAfterSplice",Array);
        Swal.fire(
          'Good',
          data1?.data?.message,
          'success'
        )
    return Array;
  } catch (err) {
    console.log("NoLoginError", err?.response?.data?.message);
  }
});
//delete Ambassador
export const deletePartner = createAsyncThunk("deletePartner", async ({id,ambassadorsData}) => {
  let Array=[...ambassadorsData];
    console.log("checkId", id);
    try {
      const data = await axios.delete(
        `${SERVERURL}/delete/ambassador/${id}`
      );
      let index = 0;
      ambassadorsData.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
  
      });
  
    
      Array.splice(index, 1);

      console.log("DataRes", data.data);
      Swal.fire(
      
        data?.data?.message,
        'success'
      )
      return Array;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
    }

});
//delete user
export const deleteUser = createAsyncThunk("deleteUser", async ({id,userData}) => {
  let Array=[...userData];
    console.log("checkId", id);
    try {
      const data = await axios.delete(
        `${SERVERURL}/delete/user/${id}`
      );
      let index = 0;
      userData.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
  
      });
  
    
      Array.splice(index, 1);

      console.log("DataRes", data.data);
      Swal.fire(
      
        data?.data?.message,
        'success'
      )
      return Array;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
    }

});


//get ambassadors
export const getAmbassadors = createAsyncThunk("getAmbassadors", async (data) => {
  try {
    const data1 = await axios.get(`${SERVERURL}/admin/ambassadors`);

    console.log("data1Response",data1.data.ambassadors)
   
    return data1.data.ambassadors;
  } catch (err) {
    console.log(err);
  }
});
//Verify Ambassador
export const verifyAmbassador = createAsyncThunk("verifyAmbassador", async (id) => {

  try {
    // console.log("ArrayUpdateBefore",Array);
    const data1 = await axios.post(
      `${SERVERURL}/verify/ambassador/${id}`
    );


    return data1;
  } catch (err) {
    console.log("NoLoginError", err?.response?.data?.message);
  }
});


//delete partner
export const deletePartnerSlider = createAsyncThunk("deletePartnerSlider", async ({id,getPartnersData}) => {
  let Array=[...getPartnersData];
    console.log("checkId", id);
    try {
      const data = await axios.delete(
        `${SERVERURL}/delete/partner/${id}`
      );
      let index = 0;
      getPartnersData.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
  
      });
  
    
      Array.splice(index, 1);

      console.log("DataRes", data.data);
      Swal.fire(
      
        data?.data?.message,
        'success'
      )
      return Array;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
    }

});


//update partner
export const updatePartner = createAsyncThunk("updatePartner", async ({data,id,getPartnersData}) => {
  // console.log("check", detail);
  let Array=[...getPartnersData];
  try {
    // console.log("ArrayUpdateBefore",Array);
    const data1 = await axios.put(
      `${SERVERURL}/admin/update/partner/${id}`,
      data
    );

    console.log("data1Update",data1?.data?.data._id);
    console.log("data1Update",data1?.data?.data);
    console.log("ArrayUpdate",Array);

    let index = 0;
    getPartnersData?.map((item, i) => {
      if (item?._id === data1?.data?.data?._id) {
        index = i;
        console.log("indexResult", index);
      }
    });
    console.log("DataResDataRes",data1?.data?.data?._id);
    console.log("DataResDataRes",data1?.data?.data);

    

        Array.splice(index, 1,data1?.data?.data);
        console.log("ArrayUpdateAfterSplice",Array);
        Swal.fire(
          'Good',
          data1?.data?.message,
          'success'
        )
    return Array;
  } catch (err) {
    console.log("NoLoginError", err?.response?.data?.message);
  }
});
export const CustomerReducer = createSlice({
  name: "CustomerReducer",
  initialState: initialStateFunction(),
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  
    resetState: (state) => initialStateFunction(),
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.userDataAdmins = action.payload;
    },
    [deleteUser.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.userDataAdmins = action.payload;
    },
    [UpdateUser.fulfilled]: (state, action) => {
      
      console.log("action.payload",action.payload)
      state.userDataAdmins = action.payload;
    },
    [getAmbassadors.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getAmbassadorsData = action.payload;
    },
    [UpdateAmbassador.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getAmbassadorsData = action.payload;
    },
    [deletePartner.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getAmbassadorsData = action.payload;
    },
    [getPartners.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getPartnersData = action.payload;
    },
    [addPartner.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getPartnersData = action.payload;
    },
    [deletePartnerSlider.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getPartnersData = action.payload;
    },
    [updatePartner.fulfilled]: (state, action) => {

      console.log("action.payload",action.payload)
      state.getPartnersData = action.payload;
    },
   
  },
});



//Forgot Password
export const forgotPassword = createAsyncThunk("forgotPassword", async (data) => {

  try {
    const data1 = await axios.post(`${SERVERURL}/forgotPassword`, data);

   
 console.log("Veridydata1",data1)
    return data1;
  } catch (err) {
    console.log("errorCon",err.response.data.message)
    console.log(err);
    return err;
    // Swal.fire(
    //   err.response.data.message,
    //   err.response.data.message,
    
    //       'error'
    //     )
 
  }
});


//reset Password
export const resetPassword = createAsyncThunk("resetPassword", async (data) => {

  try {
    const data1 = await axios.post(`${SERVERURL}/resetPassword/${data.id}`, data);

   
 console.log("Veridydata1",data1)
    return data1;
  } catch (err) {
    console.log("errorCon",err)
    console.log(err);
  }
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["CustomerReducer"],
};

const user = CustomerReducer.reducer;

// Action creators are generated for each case reducer function
export const { setCurrentUser, } = CustomerReducer.actions;
export default persistReducer(persistConfig, user);

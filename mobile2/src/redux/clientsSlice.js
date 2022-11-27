import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientsArr: [ 
    {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
    {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
    {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
    {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
  ]
}

export const clientsSlice = createSlice({
  name: 'mobileClients',
  initialState,
  reducers: {

    updateClients: (state, action) => {
      for (let client of state.clientsArr) {
        if (client.id === action.payload.id) {
          client.fam = action.payload.familia;
          client.im = action.payload.name;
          client.otch = action.payload.otches;
          client.balance = action.payload.money;
        }
      }
    },

    addNewClient: (state, action) => {
      state.clientsArr.push(action.payload);
    },

    deleteClient: (state, action) => {
      state.clientsArr = state.clientsArr.filter((client) => client.id !== action.payload);
    },
  },
});

export const { updateClients, addNewClient, deleteClient } = clientsSlice.actions;

export default clientsSlice.reducer;
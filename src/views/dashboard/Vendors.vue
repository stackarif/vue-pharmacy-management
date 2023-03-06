<template>
  <div class="d-flex jc-between ai-center">
    <h2>All vendors</h2>
    <the-button @click="addModal= true"> Add New </the-button>
  </div>
  <div class="text-center" v-if="gettingVendors">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>

    </thead>
    <tbody v-for="vendor in vendors" :key="vendor.name">
      <td>{{ vendor.name }}</td>
      <td>{{ vendor.description }}</td>
      <td>
        <img src="../../../src/img/edit.png" class="action-icon"
        @click="selectedVendor=vendor; editModal=true;"
        >
        <img src="../../../src/img/trash.png" class="action-icon action-icon--delete ml-3"
        @click="
        selectedVendor=vendor;
        deleteModal=true;
        "
        >
      </td>
    </tbody>
    
  </table>
  <the-modal v-model="addModal" heading="Add new vendor">
    <form action="" @submit.prevent="addNew">
      <label for="" class="block">Vendor Name</label>
      <input type="text" placeholder="Enter vendor name" 
      class="mt-1 w-100" 
      required
      v-model="newVendor.name"
      >

      <label for="" class="block">Description</label>
      <input type="text" placeholder="Write short description" 
      class="mt-1 w-100" 
      required
      v-model="newVendor.description"
      >
      <the-button :loading="adding" class="w-100 mt-4">Add</the-button>
    </form>
  
  </the-modal>

  <the-modal v-model="deleteModal" heading="Are you sur?">
    <p>Do you really want to delete
      <strong>{{ selectedVendor.name }}</strong>
    </p>
    <the-button class="mt-4" @click="deleleteVendor" :loading="deleting">Yes</the-button>
    <the-button class="ml-4" color="gray" @click="deleteModal=false">No</the-button>

  
  </the-modal>

  <the-modal v-model="editModal" heading="Edit vendor">
    <form action="" @submit.prevent="editVendor">
      <label for="" class="block">Vendor Name</label>
      <input type="text" placeholder="Enter vendor name" 
      class="mt-1 w-100" 
      required
      v-model="selectedVendor.name"
      >

      <label for="" class="block">Description</label>
      <input type="text" placeholder="Write short description" 
      class="mt-1 w-100" 
      required
      v-model="selectedVendor.description"
      >
      <the-button :loading="editing" class="w-100 mt-4">Save changes</the-button>
    </form>
  
  </the-modal>
</template>

<script>
import axios from 'axios';
import {eventBus} from "../../utils/eventBus";
import {showErrorMessage, showSuccessMessage} from "../../utils/function";
import TheButton from '../../components/TheButton.vue';
import TheModal from '../../components/TheModal.vue';
import privateService from '../../service/privateService';
export default {
  data:() =>({
        addModal: false,
        deleteModal: false,
        editModal: false,

        newVendor: {
          name: "",
          description: ""
        },
        vendors: [],
        gettingVendors: false,
        adding: false,

        selectedVendor: {},
        deleting: false,
        editing: false,
        

    }),
  components:{
    TheModal,
    TheButton,
    
  },
  mounted(){
    setTimeout(this.getAllVendors, 100);
    // this.getAllVendors();

  },
  methods:{
    resetForm(){
      this.newVendor = {name: "", description: ""};
    },

    //Output data by api call
    getAllVendors(){
      this.gettingVendors = true;
      privateService.getVendors()
      .then((res) =>{
        this.vendors = res.data;

      })
      .catch((err) =>{
        showErrorMessage(err);

      })
      .finally(()=>{
        this.gettingVendors = false;
      });  

    },

    addNew(){
      console.log(this.newVendor);
      this.adding = true;
      privateService.addVendor(this.newVendor)
      .then((res) =>{
            console.log(res.data);
            showSuccessMessage(res);

            this.addModal = false;
            this.resetForm();
            this.getAllVendors();
           
          })
          .catch((err) =>{
            showErrorMessage(err);

          })
          .finally(()=>{
            this.adding = false;
          });   

    },
    deleleteVendor(){
      this.deleting = true;
      privateService.deleteVendor(this.selectedVendor._id)
      .then((res) =>{
            showSuccessMessage(res);

            this.deleteModal = false;
            this.getAllVendors();
           
          })
          .catch((err) =>{
            showErrorMessage(err);

          })
          .finally(()=>{
            this.deleting = false;
          }); 

    },
    editVendor(){
      this.editing = true;
      privateService.editVendor(this.selectedVendor)
     .then((res) =>{
            showSuccessMessage(res);
            this.editModal = false;
           
          })
          .catch((err) =>{
            showErrorMessage(err);

          })
          .finally(()=>{
            this.editing = false;
          }); 

    }

  }

};
</script>

<style>

</style>
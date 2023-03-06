<template>
  <div class="d-flex jc-between ai-center">
    <h2>All drugs</h2>
    <the-button @click="addModal= true"> Add New </the-button>
  </div>
  <div class="text-center" v-if="gettingDrugs">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>

    </thead>
    <tbody >
      <tr v-for="vendor in drugs" :key="vendor.name">
        <td>
          {{ vendor.name }}
        </td>
        <td>
          {{ vendor.weight }}
        </td>
        <td>
          {{ vendor.type }}
        </td>
        <td>
          {{ vendor.vendor }}
        </td>
        <td>
          {{ vendor.price }}
        </td>
        <td>
          {{ vendor.quantity }}
        </td>
        <td>
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedDrug = vendor;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedDrug = vendor;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
    
  </table>
  <the-modal v-model="addModal" heading="Add new drug">
    <form action="" @submit.prevent="addNew">
      <label for="" class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="newDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsule"
            v-model="newDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="newDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="newDrug.type"
          />
          Suppository
        </label>
      </div>



       
      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="newDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="newDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="newDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="newDrug.quantity"
      />

      <the-button :loading="adding" class="w-100 mt-4"> Add </the-button>
    </form>
  
  </the-modal>

  <the-modal v-model="deleteModal" heading="Are you sur?">
    <p>Do you really want to delete
      <strong>{{ selectedDrug.name }}</strong>
    </p>
    <the-button class="mt-4" @click="deleteDrug" :loading="deleting">Yes</the-button>
    <the-button class="ml-4" color="gray" @click="deleteModal=false">No</the-button>

  
  </the-modal>

  <the-modal v-model="editModal" heading="Edit drug">
    <form action="" @submit.prevent="editDrug">
      <label for="" class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="selectedDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsule"
            v-model="selectedDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="selectedDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="selectedDrug.type"
          />
          Suppository
        </label>
      </div>



       
      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="selectedDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="selectedDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="selectedDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="selectedDrug.quantity"
      />

      <the-button :loading="editing" class="w-100 mt-4"> Add </the-button>
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

        newDrug: {
          name: "",
          weight: "",
          type: "",
          vendor: "",
          price: "",
          quantity: "",
          vendor: ""
          
        },
        drugs: [],
        gettingDrugs: false,
        adding: false,

        selectedDrug: {},
        deleting: false,
        editing: false,
        

    }),
  components:{
    TheModal,
    TheButton,
    
  },
  mounted(){
    setTimeout(this.getAllDrugs, 100);
    setTimeout(this.getAllVendors, 100);
    // this.getAllDrugs();

  },
  methods:{
    resetForm(){
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
          
      };
    },

    //Output data by api call
    getAllDrugs(){
      this.gettingDrugs = true;
      privateService.getDrugs()
      .then((res) =>{
        this.drugs = res.data;

      })
      .catch((err) =>{
        showErrorMessage(err);

      })
      .finally(()=>{
        this.gettingDrugs = false;
      });  

    },

    getAllVendors(){
      // this.gettingDrugs = true;
      privateService.getVendors()
      .then((res) =>{
        this.vendors = res.data;

      })
      .catch((err) =>{
        showErrorMessage(err);

      })
      .finally(()=>{
        // this.gettingDrugs = false;
      });  

    },

    addNew(){
      console.log(this.newDrug);
      this.adding = true;
      privateService.addDrug(this.newDrug)
      .then((res) =>{
            console.log(res.data);
            showSuccessMessage(res);

            this.addModal = false;
            this.resetForm();
            this.getAllDrugs();
           
          })
          .catch((err) =>{
            showErrorMessage(err);

          })
          .finally(()=>{
            this.adding = false;
          });   

    },
    deleteDrug(){
      this.deleting = true;
      privateService.deleteDrug(this.selectedDrug._id)
      .then((res) =>{
            showSuccessMessage(res);

            this.deleteModal = false;
            this.getAllDrugs();
           
          })
          .catch((err) =>{
            showErrorMessage(err);

          })
          .finally(()=>{
            this.deleting = false;
          }); 

    },
    editDrug(){
      this.editing = true;
      privateService.editDrug(this.selectedDrug)
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
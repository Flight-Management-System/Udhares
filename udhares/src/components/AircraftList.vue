<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="aircrafts"
        :sort-by="['reg_no']"
        class="elevation-1"
      >
        <!-- Top Slot for CRUD Buttons -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Aircrafts Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showDialog('create')">New Aircraft</v-btn>
          </v-toolbar>
        </template>
  
        <!-- Item Slot for Actions (Edit, Delete) -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showDialog('edit', item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="showDeleteDialog(item)">
            mdi-delete
          </v-icon>
        </template>
  
        <!-- No-data Slot -->
        <template v-slot:no-data>
          <v-btn color="primary">
            No Data
          </v-btn>
        </template>
  
        <!-- Item slot for boolean -->
        <template v-slot:[`item.is_active`]="{ item }">
            <v-chip :color="item.is_active ? 'green' : 'red'" dark rounded>
                {{ item.is_active ? 'Yes' : 'No' }}
            </v-chip>
        </template>

      </v-data-table>
  
      <!-- Dialog for Create/Edit Aircraft -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogType === 'create' ? 'Create Aircraft' : 'Edit Aircraft' }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.reg_no" label="Registration" required></v-text-field>
                  <v-text-field v-model="editedItem.seat_count" label="No. of Seats" required></v-text-field>
                  <v-text-field v-model.number="editedItem.dow" label="DOW" required></v-text-field>
                  <v-text-field v-model.number="editedItem.mtow" label="MTOW" required></v-text-field>
                  <v-text-field v-model.number="editedItem.ktas" label="KTAS" required></v-text-field>
                  <v-text-field v-model.number="editedItem.fuel_capacity" label="Fuel Capacity" required></v-text-field>
                  <v-text-field v-model.number="editedItem.cg_index" label="CG Index" required></v-text-field>
                  <v-switch v-model="editedItem.is_active" :color="editedItem.is_active ? 'green' : 'red'" label="Active"></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Confirmation Dialog for Deleting Location -->
      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this Aircraft?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        aircrafts: [],
        dialog: false,
        dialogDelete: false,
        dialogType: '', // 'create' or 'edit'
        editedItem: {},
        defaultItem: {
          reg_no: '',
          seat_count: 0,
          dow: 0,
          mtow: 0,
          ktas: 0,
          fuel_capacity: 0,
          cg_index: 0,
          is_active: false,
        },
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Registration', value: 'reg_no' },
          { title: 'No. of Seats', value: 'seat_count' },
          { title: 'DOW', value: 'dow' },
          { title: 'MTOE', value: 'mtow' },
          { title: 'KTAS', value: 'ktas' },
          { title: 'Fuel Capacity', value: 'fuel_capacity' },
          { title: 'CG Index', value: 'cg_index' },
          { title: 'Active', value: 'is_active' },
          { title: 'Actions', value: 'actions', sortable: false }
        ]
      };
    },
    
      methods: {
        fetchAircrafts() {
          axios.get('http://127.0.0.1:8000/api/aircrafts').then(response => {
            this.aircrafts = response.data;
          }).catch(error => {
            console.error("Failed to fetch Aircrafts:", error);
          });
        },
  
        showDialog(type, item = null) {
          console.log("Opening dialog for:", type, "with item:", item);
          this.dialog = true;
          this.dialogType = type;
          if (type === 'edit' && item) {
            this.editedItem = { ...item };
          } else {
            this.editedItem = { ...this.defaultItem };
          }
        },
  
  
        closeDialog() {
          this.dialog = false;
        },
  
        save() {
          const method = this.dialogType === 'create' ? 'post' : 'put';
          const url = this.dialogType === 'create' ? `http://127.0.0.1:8000/api/aircrafts` : `http://127.0.0.1:8000/api/aircrafts/${this.editedItem.id}`;
          axios[method](url, this.editedItem).then(() => {
            this.fetchAircrafts();
            this.closeDialog();
          }).catch(error => {
            console.error("Error saving the item:", error);
            alert("Failed to save aircraft: " + (error.response ? error.response.data.message : "Unknown error"));
          });
        },
  
        showDeleteDialog(item) {
          this.editedItem = { ...item };
          this.dialogDelete = true;
        },
  
        deleteItemConfirm() {
          axios.delete(`http://127.0.0.1:8000/api/aircrafts/${this.editedItem.id}`).then(() => {
            this.fetchAircrafts();
            this.dialogDelete = false;
          }).catch(error => {
            console.error("Deletion failed:", error);
            this.dialogDelete = false;
          });
        },
  
        closeDelete() {
          this.dialogDelete = false;
        },
  },
    created() {
      this.fetchAircrafts();
    }
  }
  </script>
  
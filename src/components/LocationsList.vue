<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="locations"
      :sort-by="['name']"
      class="elevation-1"
    >
      <!-- Top Slot for CRUD Buttons -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Locations Management</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog('create')">New Location</v-btn>
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
      <template v-slot:[`item.is_fuelable`]="{ item }">
      <v-chip :color="item.is_fuelable ? 'green' : 'red'" dark rounded>
        {{ item.is_fuelable ? 'Yes' : 'No' }}
      </v-chip>
      </template>

    <template v-slot:[`item.is_maintenance_base`]="{ item }">
      <v-chip :color="item.is_maintenance_base ? 'green' : 'red'" dark rounded>
        {{ item.is_maintenance_base ? 'Yes' : 'No' }}
      </v-chip>
    </template>

    </v-data-table>

    <!-- Dialog for Create/Edit Location -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogType === 'create' ? 'Create Location' : 'Edit Location' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.name" label="Name" required></v-text-field>
                <v-text-field v-model="editedItem.shortcode" label="Shortcode" required></v-text-field>
                <v-text-field v-model.number="editedItem.lat" label="Latitude" required></v-text-field>
                <v-text-field v-model.number="editedItem.long" label="Longitude" required></v-text-field>
                <v-text-field v-model.number="editedItem.platform_count" label="Platform Count" required></v-text-field>
                <v-switch v-model="editedItem.is_fuelable" :color="editedItem.is_fuelable ? 'green' : 'red'" label="Fuelable"></v-switch>
                <v-switch v-model="editedItem.is_maintenance_base" :color="editedItem.is_maintenance_base ? 'green' : 'red'" label="Maintenance Base"></v-switch>
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
        <v-card-title class="text-h5">Are you sure you want to delete this location?</v-card-title>
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
      locations: [],
      dialog: false,
      dialogDelete: false,
      dialogType: '', // 'create' or 'edit'
      editedItem: {},
      defaultItem: {
        name: '',
        shortcode: '',
        lat: 0,
        long: 0,
        platform_count: 0,
        is_fuelable: false,
        is_maintenance_base: false
      },
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Shortcode', value: 'shortcode' },
        { title: 'Latitude', value: 'lat' },
        { title: 'Longitude', value: 'long' },
        { title: 'Platform Count', value: 'platform_count' },
        { title: 'Fuelable', value: 'is_fuelable' },
        { title: 'Maintenance Base', value: 'is_maintenance_base' },
        { title: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  
    methods: {
      fetchLocations() {
        axios.get('http://127.0.0.1:8000/api/locations').then(response => {
          this.locations = response.data;
        }).catch(error => {
          console.error("Failed to fetch locations:", error);
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
        const url = this.dialogType === 'create' ? `http://127.0.0.1:8000/api/locations` : `http://127.0.0.1:8000/api/locations/${this.editedItem.id}`;
        axios[method](url, this.editedItem).then(() => {
          this.fetchLocations();
          this.closeDialog();
        }).catch(error => {
          console.error("Error saving the item:", error);
          alert("Failed to save location: " + (error.response ? error.response.data.message : "Unknown error"));
        });
      },

      showDeleteDialog(item) {
        this.editedItem = { ...item };
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        axios.delete(`http://127.0.0.1:8000/api/locations/${this.editedItem.id}`).then(() => {
          this.fetchLocations();
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
    this.fetchLocations();
  }
}
</script>

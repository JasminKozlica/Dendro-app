import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../../services/admin.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  users: User[] = [];
  
  newUser = { username: '', password: '', firstname:'', lastname:'' };
  editUser: User | null = null;
  message: string | null = null;

  // Boolean flag za prikaz modala
  showEditModal = false;

  constructor(private adminService: AdminService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((data: User[]) => this.users = data);
  }


  createUser() {
    this.adminService.createUser(this.newUser).subscribe({
      next: (res) => {
        this.loadUsers();
        this.newUser = { username: '', password: '',firstname: '',lastname:''};
        this.message = res?.message || 'User created successfully';
      },
      error: err => {
        console.error('Backend error: ', err);
        this.message = 'Error: ' + (err.error?.message || err.error || 'Something went wrong');
      }
    });
  }

  startEdit(user: User) {
    this.editUser = { ...user, password: '' };
    this.showEditModal = true; // otvori modal
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editUser = null;
  }

   updateUser() {
    if (this.editUser) {
      this.adminService.updateUser(this.editUser.id, this.editUser).subscribe({
        next: () => {
          this.message = 'User updated successfully';
          this.loadUsers();
          this.closeEditModal(); // zatvori modal
        },
        error: err => {
          this.message = 'Error: ' + (err.error || 'Something went wrong');
        }
      });
    }
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.message = 'User deleted successfully';
      },
      error: err => {
        this.message = 'Error: ' + (err.error || 'Something went wrong');
      }  
    });
  }
}

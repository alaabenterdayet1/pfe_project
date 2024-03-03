import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/api_service.dart';
import 'add_user_screen.dart';

class UsersScreen extends StatefulWidget {
  @override
  _UsersScreenState createState() => _UsersScreenState();
}

class _UsersScreenState extends State<UsersScreen> {
  late List<User> _users = [];

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    try {
      final List<User> users = await ApiService.getUsers();
      setState(() {
        _users = users;
      });
    } catch (e) {
      print('Error fetching users: $e');
      // Gérer les erreurs de chargement des utilisateurs
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Utilisateurs'),
        backgroundColor: Colors.indigo, // Couleur de la barre d'application
      ),
      body: _buildUserList(),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateToAddUserScreen,
        child: Icon(Icons.add),
        backgroundColor: Colors.green, // Couleur du bouton d'action flottant
      ),
    );
  }

  Widget _buildUserList() {
    if (_users.isEmpty) {
      return Center(
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(Colors.red), // Couleur du CircularProgressIndicator
        ),
      );
    } else {
      return ListView.builder(
        itemCount: _users.length,
        itemBuilder: (context, index) {
          final user = _users[index];
          return Card( // Utilisation de Card pour un effet visuel amélioré
            elevation: 4.0, // Ombre sous la carte
            margin: EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0), // Marge autour de la carte
            child: ListTile(
              title: Text(user.name, style: TextStyle(fontWeight: FontWeight.bold)), // Nom en gras
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(user.email),
                  Text('Téléphone: ${user.phone}'),
                  Text('Rôle: ${user.role}'),
                ],
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(Icons.edit, color: Colors.orange), // Icône de modification en couleur
                    onPressed: () => _navigateToEditUserScreen(user),
                  ),
                  IconButton(
                    icon: Icon(Icons.delete, color: Colors.red), // Icône de suppression en couleur
                    onPressed: () => _deleteUser(user.id),
                  ),
                ],
              ),
            ),
          );
        },
      );
    }
  }
  Future<void> _deleteUser(String userId) async {
    try {
      await ApiService.deleteUser(userId);
      setState(() {
        _users.removeWhere((user) => user.id == userId);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('User deleted successfully'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      print('Error deleting user: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to delete user'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  void _navigateToAddUserScreen() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddUserScreen()),
    ).then((value) {
      if (value == true) {
        _fetchUsers();
      }
    });
  }

  void _navigateToEditUserScreen(User user) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddUserScreen(user: user)),
    ).then((value) {
      if (value == true) {
        _fetchUsers();
      }
    });
  }
}

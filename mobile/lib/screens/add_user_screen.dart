import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/api_service.dart';


class AddUserScreen extends StatefulWidget {
  final User? user;

  const AddUserScreen({Key? key, this.user}) : super(key: key);

  @override
  _AddUserScreenState createState() => _AddUserScreenState();
}

class _AddUserScreenState extends State<AddUserScreen> {
  late TextEditingController _usernameController;
  late TextEditingController _emailController;
  late TextEditingController _roleController;
  late TextEditingController _passwordController;

  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController(text: widget.user?.username ?? '');
    _emailController = TextEditingController(text: widget.user?.email ?? '');
    _roleController = TextEditingController(text: widget.user?.role ?? '');
    _passwordController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user == null ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'),
        backgroundColor: Colors.deepPurple, // Couleur personnalisée de la barre d'app
      ),
      body: SingleChildScrollView( // Permet le défilement si le clavier couvre le formulaire
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [

            _buildTextField(_usernameController, 'Nom d\'utilisateur', Icons.person_outline),
            _buildTextField(_emailController, 'Email', Icons.email),
            _buildTextField(_roleController, 'Rôle', Icons.work_outline),
            _buildPasswordField(),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitUser,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green, // Couleur du bouton
                padding: EdgeInsets.symmetric(vertical: 12), // Hauteur du bouton
              ),
              child: Text(widget.user == null ? 'Ajouter' : 'Enregistrer les modifications'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String label, IconData icon) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(25.0), // Bordure arrondie
          ),
          prefixIcon: Icon(icon), // Icône à l'intérieur du champ
        ),
      ),
    );
  }

  Widget _buildPasswordField() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: _passwordController,
        obscureText: true, // Masquer le texte pour le mot de passe
        decoration: InputDecoration(
          labelText: 'Mot de passe',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(25.0),
          ),
          prefixIcon: Icon(Icons.lock_outline),
        ),
      ),
    );
  }


  Future<void> _submitUser() async {
    try {
      final newUser = User(
        id: widget.user?.id ?? '',
        username: _usernameController.text.trim(),
        email: _emailController.text.trim(),
        role: _roleController.text.trim(),
        password: _passwordController.text.trim(),
        active: true, // You may need to handle active status separately
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      if (widget.user == null) {
        await ApiService.createUser(newUser);
      } else {
        await ApiService.updateUser(newUser);
      }

      Navigator.pop(context, true); // Return true to indicate success
    } catch (e) {
      print('Error saving user: $e');
      // Handle error saving user
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Error'),
          content: Text('Failed to save user'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('OK'),
            ),
          ],
        ),
      );
    }
  }
}

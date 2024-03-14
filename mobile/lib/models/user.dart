class User {
  final String id;
  final String username;
  final String email;
  final String password;

  final String role;
  final bool active;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.password,
    required this.role,
    required this.active,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    try {
      return User(
        id: json['_id'] ?? '',
        username: json['username'] ?? '',
        email: json['email'] ?? '',
        password: json['password'] ?? '',

        role: json['role'] ?? '',
        active: json['active'] ?? false,
        createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) ?? DateTime.now() : DateTime.now(),
        updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) ?? DateTime.now() : DateTime.now(),
      );
    } catch (e) {
      print('Error parsing date: $e');
      return User(
        id: '',
        username: '',
        email: '',
        password: '',

        role: '',
        active: false,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
    }
  }

  Map<String, dynamic> toJson() {
    return {

      'username': username,
      'email': email,
      'password': password,

      'role': role,
      'active': active,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}

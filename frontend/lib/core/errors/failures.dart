import 'package:equatable/equatable.dart';

/// Base class for all failures in the application
abstract class Failure extends Equatable {
  final String message;
  final String? code;
  
  const Failure(this.message, [this.code]);
  
  @override
  List<Object?> get props => [message, code];
}

/// Failure representing server-side errors
class ServerFailure extends Failure {
  const ServerFailure([String message = 'Server failure occurred', String? code])
      : super(message, code);
}

/// Failure representing network connectivity issues
class NetworkFailure extends Failure {
  const NetworkFailure([String message = 'Network failure occurred', String? code])
      : super(message, code);
}

/// Failure representing caching issues
class CacheFailure extends Failure {
  const CacheFailure([String message = 'Cache failure occurred', String? code])
      : super(message, code);
}

/// Failure representing authentication issues
class AuthenticationFailure extends Failure {
  const AuthenticationFailure([String message = 'Authentication failed', String? code])
      : super(message, code);
}

/// Failure representing authorization issues
class AuthorizationFailure extends Failure {
  const AuthorizationFailure([String message = 'Authorization failed', String? code])
      : super(message, code);
}

/// Failure representing validation errors
class ValidationFailure extends Failure {
  const ValidationFailure([String message = 'Validation failed', String? code])
      : super(message, code);
}
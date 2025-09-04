/// Base class for all exceptions in the application
abstract class AppException implements Exception {
  final String message;
  final String? code;
  
  const AppException(this.message, [this.code]);
  
  @override
  String toString() => 'AppException: $message';
}

/// Exception thrown when there's a server error
class ServerException extends AppException {
  const ServerException([String message = 'Server error occurred', String? code])
      : super(message, code);
}

/// Exception thrown when there's a network connectivity issue
class NetworkException extends AppException {
  const NetworkException([String message = 'Network error occurred', String? code])
      : super(message, code);
}

/// Exception thrown when there's a caching issue
class CacheException extends AppException {
  const CacheException([String message = 'Cache error occurred', String? code])
      : super(message, code);
}

/// Exception thrown when user is not authenticated
class UnauthorizedException extends AppException {
  const UnauthorizedException([String message = 'User is not authenticated', String? code])
      : super(message, code);
}

/// Exception thrown when user doesn't have permission
class ForbiddenException extends AppException {
  const ForbiddenException([String message = 'Access forbidden', String? code])
      : super(message, code);
}

/// Exception thrown when requested resource is not found
class NotFoundException extends AppException {
  const NotFoundException([String message = 'Resource not found', String? code])
      : super(message, code);
}

/// Exception thrown when request times out
class TimeoutException extends AppException {
  const TimeoutException([String message = 'Request timeout', String? code])
      : super(message, code);
}
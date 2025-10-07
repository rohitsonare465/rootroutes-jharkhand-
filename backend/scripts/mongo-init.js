// MongoDB initialization script for Docker
// This script runs as the root user during container initialization

// Switch to admin database and create admin user
db = db.getSiblingDB('admin');

// Create admin user with proper roles for external access
db.createUser({
  user: 'admin',
  pwd: 'admin123',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' },
    { role: 'dbAdminAnyDatabase', db: 'admin' },
    { role: 'root', db: 'admin' }
  ]
});

print('Admin user created successfully');

// Switch to application database
db = db.getSiblingDB('rootroutes_jharkhand');

// Create collections
db.createCollection('users');
db.createCollection('destinations');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.destinations.createIndex({ title: "text", description: "text", location: "text" });
db.destinations.createIndex({ tags: 1 });
db.destinations.createIndex({ location: 1 });
db.destinations.createIndex({ "rating.average": -1 });

print('Database initialized successfully');

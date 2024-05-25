-- Seed data for organizations table
INSERT INTO organizations (name, logo_url)
VALUES
    ('Premagic', 'https://example.com/logo1.png'),
    ('Organization 1', 'https://example.com/logo2.png'),
-- Seed data for users table
INSERT INTO users (email, password)
VALUES
    ('anenth@premagic', 'password'),
    ('user2@example.com', 'password'),
    ('user3@example.com', 'password');

-- Seed data for user_organizations table
INSERT INTO user_organizations (user_id, organization_id)
VALUES
    ((SELECT id FROM users WHERE email = 'anenth@premagic'), (SELECT id FROM organizations WHERE name = 'Premagic')),
    ((SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM organizations WHERE name = 'Premagic')),
    ((SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM organizations WHERE name = 'Organization 1'));

-- Seed data for roles table
INSERT INTO roles (name)
VALUES
    ('Admin'),
    ('Team Member'),

-- Seed data for permissions table
INSERT INTO permissions (name)
VALUES
    ('Billing'),
    ('Reporting'),
    ('Support'),

-- Seed data for user_roles table
INSERT INTO user_roles (user_id, role_id)
VALUES
    ((SELECT id FROM users WHERE email = 'anenth@premagic.com'), (SELECT id FROM roles WHERE name = 'Admin')),
    ((SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM roles WHERE name = 'Team Member')),
    ((SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM roles WHERE name = 'Admin'));

-- Seed data for role_permissions table
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'Billing')),
    ((SELECT id FROM roles WHERE name = 'Team Memeber'), (SELECT id FROM permissions WHERE name = 'Reporting')),
    ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'Support')),

-- Seed data for messages table
INSERT INTO messages (user_organization_id, content, created_by)
VALUES
    ((SELECT id FROM user_organizations WHERE user_id = (SELECT id FROM users WHERE email = 'anenth@premag.com') AND organization_id = (SELECT id FROM organizations WHERE name = 'Premagic')), 'Message 2', (SELECT id FROM users WHERE email = 'anenth@premagic.com')),

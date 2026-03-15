-- Step 1: Insert system item types (idempotent)
INSERT INTO "ItemType" ("id", "name", "icon", "color", "isSystem", "userId")
SELECT gen_random_uuid()::text, v.name, v.icon, v.color, true, NULL
FROM (VALUES
  ('snippet',  'Code',       '#3b82f6'),
  ('prompt',   'Sparkles',   '#8b5cf6'),
  ('command',  'Terminal',   '#f97316'),
  ('note',     'StickyNote', '#fde047'),
  ('file',     'File',       '#6b7280'),
  ('image',    'Image',      '#ec4899'),
  ('link',     'Link',       '#10b981')
) AS v(name, icon, color)
WHERE NOT EXISTS (
  SELECT 1 FROM "ItemType" t
  WHERE t."name" = v.name AND t."isSystem" = true AND t."userId" IS NULL
);

-- Step 2: Delete existing demo user (and cascade related data)
DELETE FROM "User" WHERE "email" = 'demo@devstash.io';

-- Step 3: Insert demo user with proper bcrypt hash
-- Password: 12345678
INSERT INTO "User" ("id", "email", "name", "hashedPassword", "isPro", "emailVerified", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'demo@devstash.io',
  'Demo User',
  '$2b$12$vieDGexnuuKp0X2L/wvtTujkoXEnHOw7pBNJJRxsJL71Or6O0sxIS',
  false,
  NOW(),
  NOW(),
  NOW()
);

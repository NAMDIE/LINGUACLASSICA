-- Migration: add_public_insert_policy_user_profiles
-- Created at: 1761553264

-- Add policy to allow public role to insert profiles (during registration)
CREATE POLICY "Allow public to insert profiles during signup"
ON user_profiles FOR INSERT
TO public
WITH CHECK (auth.uid() = id);;
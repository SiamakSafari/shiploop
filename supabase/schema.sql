-- ShipLoop Database Schema
-- Run in Supabase SQL Editor

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light', 'system')),
  notifications_enabled BOOLEAN DEFAULT true,
  public_profile BOOLEAN DEFAULT false,
  ship_score INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  streak_last_date DATE,
  global_rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  status TEXT DEFAULT 'idea' CHECK (status IN ('idea', 'validating', 'building', 'live', 'paused', 'archived')),
  mrr DECIMAL(10,2) DEFAULT 0,
  users_count INTEGER DEFAULT 0,
  ship_velocity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ideas
CREATE TABLE ideas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  demand INTEGER CHECK (demand >= 0 AND demand <= 100),
  competition INTEGER CHECK (competition >= 0 AND competition <= 100),
  feasibility INTEGER CHECK (feasibility >= 0 AND feasibility <= 100),
  overall INTEGER CHECK (overall >= 0 AND overall <= 100),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected', 'research')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones
CREATE TABLE milestones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  due_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Feed
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('commit', 'launch', 'revenue', 'signup', 'milestone', 'idea', 'streak')),
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Launch Checklists
CREATE TABLE launch_checklists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('producthunt', 'indiehackers', 'hackernews', 'reddit', 'twitter', 'other')),
  items JSONB DEFAULT '[]',
  launch_date DATE,
  launched BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id, platform)
);

-- Revenue entries
CREATE TABLE revenue_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  source TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  referral_code TEXT,
  referred_by UUID REFERENCES waitlist(id),
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking (for free tier limits)
CREATE TABLE usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  period_start DATE NOT NULL,
  ideas_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, period_start)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can read public profiles, edit own
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (public_profile = true OR auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscriptions: Users can only see own
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Projects: Users can CRUD own projects
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Ideas: Users can CRUD own ideas
CREATE POLICY "Users can view own ideas" ON ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own ideas" ON ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ideas" ON ideas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ideas" ON ideas FOR DELETE USING (auth.uid() = user_id);

-- Milestones: Through project ownership
CREATE POLICY "Users can view own milestones" ON milestones FOR SELECT 
  USING (EXISTS (SELECT 1 FROM projects WHERE projects.id = milestones.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can insert own milestones" ON milestones FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM projects WHERE projects.id = milestones.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can update own milestones" ON milestones FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM projects WHERE projects.id = milestones.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can delete own milestones" ON milestones FOR DELETE 
  USING (EXISTS (SELECT 1 FROM projects WHERE projects.id = milestones.project_id AND projects.user_id = auth.uid()));

-- Activities: Users can view own + public
CREATE POLICY "Users can view own activities" ON activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activities" ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Launch checklists
CREATE POLICY "Users can CRUD own checklists" ON launch_checklists FOR ALL USING (auth.uid() = user_id);

-- Revenue entries
CREATE POLICY "Users can CRUD own revenue" ON revenue_entries FOR ALL USING (auth.uid() = user_id);

-- Waitlist: Anyone can insert, only owner can see own
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own waitlist entry" ON waitlist FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Usage: Users can see own
CREATE POLICY "Users can view own usage" ON usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own usage" ON usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON usage FOR UPDATE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_ideas_user_id ON ideas(user_id);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX idx_revenue_project_id ON revenue_entries(project_id);
CREATE INDEX idx_profiles_ship_score ON profiles(ship_score DESC);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    new.id,
    LOWER(SPLIT_PART(new.email, '@', 1)) || '_' || SUBSTR(new.id::text, 1, 4),
    new.email
  );
  
  INSERT INTO public.subscriptions (user_id, tier)
  VALUES (new.id, 'free');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to check project limit
CREATE OR REPLACE FUNCTION check_project_limit()
RETURNS TRIGGER AS $$
DECLARE
  user_tier TEXT;
  project_count INTEGER;
BEGIN
  SELECT tier INTO user_tier FROM subscriptions WHERE user_id = NEW.user_id;
  
  IF user_tier = 'pro' THEN
    RETURN NEW;
  END IF;
  
  SELECT COUNT(*) INTO project_count FROM projects WHERE user_id = NEW.user_id;
  
  IF project_count >= 1 THEN
    RAISE EXCEPTION 'Free tier limited to 1 project. Upgrade to Pro for unlimited projects.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_project_limit
  BEFORE INSERT ON projects
  FOR EACH ROW EXECUTE PROCEDURE check_project_limit();

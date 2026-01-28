/**
 * Mock Supabase client for dev mode without real Supabase
 * Allows the app to build and run with mock data
 */

const mockUser = {
  id: "dev-user-123",
  email: "dev@shiploop.app",
  app_metadata: {},
  user_metadata: { full_name: "Dev User" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

const mockSession = {
  user: mockUser,
  access_token: "mock-token",
  refresh_token: "mock-refresh",
  expires_at: Date.now() + 3600000,
};

const mockProfile = {
  id: "dev-user-123",
  username: "devuser",
  name: "Dev User",
  email: "dev@shiploop.app",
  avatar_url: null,
  theme: "dark",
  notifications_enabled: true,
  public_profile: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Mock data
const mockProjects = [
  {
    id: "proj-1",
    user_id: "dev-user-123",
    name: "ShipLoop",
    description: "The Indie Hacker OS",
    status: "building",
    mrr: 0,
    users: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockIdeas = [
  {
    id: "idea-1",
    user_id: "dev-user-123",
    title: "AI Writing Tool",
    description: "Help indie hackers write better copy",
    demand: 80,
    competition: 60,
    feasibility: 90,
    overall: 70,
    status: "validated",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Create chainable mock query builder
const createMockQueryBuilder = (data: any[] = []) => {
  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    is: () => builder,
    in: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: () => Promise.resolve({ data: data[0] || null, error: null }),
    maybeSingle: () => Promise.resolve({ data: data[0] || null, error: null }),
    then: (resolve: any) => resolve({ data, error: null }),
  };
  return builder;
};

export const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: mockSession }, error: null }),
    getUser: () => Promise.resolve({ data: { user: mockUser }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { session: mockSession, user: mockUser }, error: null }),
    signInWithOAuth: () => Promise.resolve({ data: { url: "/dashboard" }, error: null }),
    signUp: () => Promise.resolve({ data: { session: mockSession, user: mockUser }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: any) => {
      callback("SIGNED_IN", mockSession);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
  from: (table: string) => {
    switch (table) {
      case "profiles":
        return createMockQueryBuilder([mockProfile]);
      case "projects":
        return createMockQueryBuilder(mockProjects);
      case "ideas":
        return createMockQueryBuilder(mockIdeas);
      default:
        return createMockQueryBuilder([]);
    }
  },
});

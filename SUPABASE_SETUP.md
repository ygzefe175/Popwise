# Supabase Setup Guide

## 1. Supabase'de Tabloları Oluşturun

Supabase Dashboard'da SQL Editor'e gidin ve aşağıdaki SQL komutlarını çalıştırın:

### Profiles Tablosu
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Users can view own profile" 
  on profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update 
  using (auth.uid() = id);
```

### Popups Tablosu
```sql
create table popups (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  type text check (type in ('exit_intent', 'scroll', 'time_based', 'custom')) not null,
  headline text not null,
  subtext text not null,
  cta_text text not null,
  is_active boolean default true,
  impressions integer default 0,
  clicks integer default 0,
  conversions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table popups enable row level security;

-- Policies
create policy "Users can view own popups" 
  on popups for select 
  using (auth.uid() = user_id);

create policy "Users can create own popups" 
  on popups for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own popups" 
  on popups for update 
  using (auth.uid() = user_id);

create policy "Users can delete own popups" 
  on popups for delete 
  using (auth.uid() = user_id);
```

### Analytics Tablosu
```sql
create table analytics (
  id uuid default uuid_generate_v4() primary key,
  popup_id uuid references popups on delete cascade not null,
  event_type text check (event_type in ('impression', 'click', 'conversion', 'close')) not null,
  visitor_tag text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table analytics enable row level security;

-- Policies
create policy "Users can view analytics for own popups" 
  on analytics for select 
  using (
    exists (
      select 1 from popups 
      where popups.id = analytics.popup_id 
      and popups.user_id = auth.uid()
    )
  );

create policy "Anyone can insert analytics" 
  on analytics for insert 
  with check (true);
```

### Trigger: Auto-create Profile
```sql
-- Function to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 2. Environment Variables

`.env.local` dosyanız zaten oluşturuldu:
```
NEXT_PUBLIC_SUPABASE_URL=https://mobmyuvmszuahoqkdhnl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Dev Server'ı Yeniden Başlatın

Terminal'de:
```bash
# Ctrl+C ile mevcut server'ı durdurun
# Sonra tekrar başlatın:
npm run dev
```

## 4. Test Edin

1. `/register` - Yeni hesap oluşturun
2. `/login` - Giriş yapın
3. `/dashboard` - Dashboard'u görün

## Oluşturulan Dosyalar

- ✅ `src/lib/supabase.ts` - Supabase client
- ✅ `src/lib/database.types.ts` - TypeScript types
- ✅ `src/hooks/useAuth.ts` - Authentication hook
- ✅ `src/app/login/page.tsx` - Login sayfası
- ✅ `src/app/register/page.tsx` - Register sayfası
- ✅ `src/app/dashboard/page.tsx` - Dashboard sayfası
- ✅ `src/components/Navbar.tsx` - Güncellenmiş (auth state)

## Kullanım Örnekleri

### Authentication
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, signIn, signUp, signOut } = useAuth();
  
  if (user) {
    return <div>Hoş geldin {user.email}</div>;
  }
  
  return <button onClick={() => signIn(email, password)}>Giriş</button>;
}
```

### Database Query
```tsx
import { supabase } from '@/lib/supabase';

// Popup'ları getir
const { data, error } = await supabase
  .from('popups')
  .select('*')
  .eq('user_id', user.id);

// Yeni popup oluştur
const { data, error } = await supabase
  .from('popups')
  .insert({
    user_id: user.id,
    name: 'Exit Intent',
    type: 'exit_intent',
    headline: 'Ayrılıyor musunuz?',
    subtext: 'İndirim kodunuzu almayı unutmayın!',
    cta_text: 'İndirimi Al'
  });
```

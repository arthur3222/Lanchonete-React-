-- Funções helper com SECURITY DEFINER (evitam recursão nas políticas)
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = uid and u.role in ('admin','master')
  );
$$;

create or replace function public.is_master(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = uid and u.role = 'master'
  );
$$;

grant execute on function public.is_admin(uuid) to anon, authenticated;
grant execute on function public.is_master(uuid) to anon, authenticated;

-- Recriar políticas da tabela usuarios sem subquery recursiva
alter table public.usuarios enable row level security;

-- Remover políticas antigas (ignore erros se não existirem)
drop policy if exists "Permitir insert durante cadastro" on public.usuarios;
drop policy if exists "Usuários podem ver próprio perfil" on public.usuarios;
drop policy if exists "Admins podem ver todos" on public.usuarios;
drop policy if exists "Apenas o próprio usuário pode atualizar" on public.usuarios;
drop policy if exists "Masters podem atualizar roles" on public.usuarios;

-- Ver o próprio registro
create policy "usuarios_select_self" on public.usuarios
for select using (auth.uid() = id);

-- Admin/Master podem ver todos
create policy "usuarios_select_admins" on public.usuarios
for select using (public.is_admin(auth.uid()));

-- Insert no cadastro (amarra id ao auth.uid())
create policy "usuarios_insert_self" on public.usuarios
for insert with check (auth.uid() = id);

-- Atualizar a si mesmo
create policy "usuarios_update_self" on public.usuarios
for update using (auth.uid() = id);

-- Master pode atualizar qualquer usuário (ex.: trocar role)
create policy "usuarios_update_master" on public.usuarios
for update using (public.is_master(auth.uid()));

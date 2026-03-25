
# Admin Dashboard Plan

## Overview
Create a protected admin dashboard page accessible only to users with the `admin` role, featuring panels for managing products, orders, users, and viewing analytics.

## Steps

### 1. Create Admin Dashboard Page (`src/pages/AdminDashboard.tsx`)
- Use `useAdmin` hook to check admin access; redirect non-admins to home
- Show loading state while checking permissions
- Dashboard sections via tabs:
  - **Overview**: Summary cards (total products, orders, users)
  - **Products**: Table listing all products with name, price, category, stock status. Add admin RLS policies for product CRUD.
  - **Orders**: Table of all orders with status, total, date
  - **Users**: Table of all profiles with email, name, join date
  - **User Tracking**: View tracking/analytics data

### 2. Database Migration
- Add RLS policies so admins can INSERT, UPDATE, DELETE products
- Add RLS policy so admins can SELECT all orders, order_items, and profiles
- Add RLS policy so admins can SELECT all user_tracking data (fix existing policy that checks JWT role instead of `has_role`)

### 3. Add Route (`src/App.tsx`)
- Add `/admin` route pointing to AdminDashboard
- Import the new page component

### 4. Add Admin Link in Header
- Update `src/components/layout/Header.tsx` to show an "Admin" link when `useAdmin` returns `isAdmin: true`

## Technical Details
- Reuse existing UI components: Tabs, Table, Card, Badge, Button
- Fetch data directly from Supabase in the dashboard (products, orders, profiles, user_tracking)
- Product management: inline edit/delete with Supabase mutations
- The existing `useAdmin` hook handles role verification via the `user_roles` table

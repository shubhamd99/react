import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserProfile, getProfileStats } from "@/lib/db/profile";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { DynamicIcon } from "@/lib/icon-map";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { DeleteAccountButton } from "@/components/profile/DeleteAccountButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  FolderOpen,
  Calendar,
  Mail,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const [profile, stats] = await Promise.all([
    getUserProfile(session.user.id),
    getProfileStats(session.user.id),
  ]);

  if (!profile) redirect("/sign-in");

  const joinDate = profile.createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* User Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserAvatar user={profile} size="lg" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">
                  {profile.name ?? "User"}
                </CardTitle>
                {profile.isPro && (
                  <Badge variant="outline" className="text-xs">
                    PRO
                  </Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {profile.email}
              </CardDescription>
              <CardDescription className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Joined {joinDate}
              </CardDescription>
              <CardDescription className="flex items-center gap-1.5">
                <Shield className="size-3.5" />
                {profile.hasPassword ? "Email & Password" : "GitHub OAuth"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Your content at a glance</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.totalItems}</span>
              <span className="text-sm text-muted-foreground">items</span>
            </div>
            <div className="flex items-center gap-2">
              <FolderOpen className="size-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {stats.totalCollections}
              </span>
              <span className="text-sm text-muted-foreground">collections</span>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.itemsByType.map((type) => (
              <div
                key={type.name}
                className="flex items-center gap-2 rounded-md border px-3 py-2"
              >
                <DynamicIcon
                  name={type.icon}
                  className="size-4"
                  style={{ color: type.color }}
                />
                <span className="text-sm capitalize">{type.name}s</span>
                <span className="ml-auto text-sm font-semibold">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {profile.hasPassword && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Update your password
                  </p>
                </div>
                <ChangePasswordForm />
              </div>
              <Separator />
            </>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-destructive">
                Delete Account
              </p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <DeleteAccountButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

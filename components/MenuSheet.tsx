import menuImage from "@/assets/menu-white.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { navRoutes } from "@/lib/contants";

export default function MenuSheet({ className }: { className?: string }) {
  return (
    <div className={cn(className, "")}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="" size={"icon"}>
            <Image alt="" className=" invert" src={menuImage} height={18} />
          </Button>
        </SheetTrigger>
        <SheetContent className=" flex justify-center gap-4 items-center flex-col">
          <SheetTitle>Menu Bar</SheetTitle>
          {navRoutes.map((route) => {
            return (
              <Link
                key={route.label}
                href={route.href}
                className=" text-sm hover:underline font-medium"
              >
                <SheetClose>{route.label}</SheetClose>
              </Link>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
}

import {Database, Tables} from "@/types/database.types";

declare global {
    type DB = Database;
    type Email = Tables<'emails'>;
    type Profile = Tables<'profiles'>
}
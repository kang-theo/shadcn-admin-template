import React from 'react'
import { Button } from "@/components/ui/button"
import { signInWithGithubAction } from "@/app/action/auth"

export default function Login() {
  return (
    <div>
      <form action={signInWithGithubAction}>
        <Button type='submit'>Login with GitHub</Button>
      </form>
    </div>
  )
}

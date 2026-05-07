"use client";

import { useState } from "react";
import {
  Button, Badge, Input, Card, Modal, Text,
  HStack, VStack, Box, useTheme,
} from "@designbase/components";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--ds-space-12)" }}>
      <Text variant="heading" size="lg" style={{ marginBottom: "var(--ds-space-6)", paddingBottom: "var(--ds-space-3)", borderBottom: "1px solid var(--ds-color-border-default)" }}>
        {title}
      </Text>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <VStack gap={2} style={{ marginBottom: "var(--ds-space-6)" }}>
      <Text variant="label" size="xs" color="muted" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </Text>
      <HStack gap={3} wrap>{children}</HStack>
    </VStack>
  );
}

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div style={{ background: "var(--ds-color-bg-primary)", minHeight: "100vh", fontFamily: "var(--ds-font-family-sans)" }}>
      {/* Header */}
      <Box style={{ background: "var(--ds-color-bg-elevated)", borderBottom: "1px solid var(--ds-color-border-default)", padding: "var(--ds-space-5) var(--ds-space-8)" }}>
        <HStack justify="between">
          <HStack gap={3}>
            <Text variant="heading" size="xl">Ergo, Design</Text>
            <Badge variant="subtle" colorScheme="brand">Components</Badge>
          </HStack>
          <HStack gap={3}>
            <Button variant="ghost" colorScheme="neutral" size="sm" onClick={toggleTheme}>
              {resolvedTheme === "dark" ? "☀ Light" : "☾ Dark"}
            </Button>
            <Button variant="outline" colorScheme="neutral" size="sm" as="a" href="/dashboard">
              Dashboard →
            </Button>
          </HStack>
        </HStack>
      </Box>

      <Box style={{ maxWidth: "900px", margin: "0 auto", padding: "var(--ds-space-10) var(--ds-space-8)" }}>

        {/* Buttons */}
        <Section title="Button">
          <Row label="Solid variants">
            <Button colorScheme="brand">Brand</Button>
            <Button colorScheme="neutral">Neutral</Button>
            <Button colorScheme="success">Success</Button>
            <Button colorScheme="error">Error</Button>
            <Button colorScheme="warning">Warning</Button>
          </Row>
          <Row label="Outline variants">
            <Button variant="outline" colorScheme="brand">Brand</Button>
            <Button variant="outline" colorScheme="neutral">Neutral</Button>
            <Button variant="outline" colorScheme="error">Error</Button>
          </Row>
          <Row label="Ghost variants">
            <Button variant="ghost" colorScheme="brand">Brand</Button>
            <Button variant="ghost" colorScheme="neutral">Neutral</Button>
            <Button variant="ghost" colorScheme="error">Error</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button isLoading>Loading</Button>
            <Button isDisabled>Disabled</Button>
            <Button leftIcon="✉" colorScheme="brand">With icon</Button>
          </Row>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <Row label="Subtle (default)">
            <Badge colorScheme="brand">Brand</Badge>
            <Badge colorScheme="neutral">Neutral</Badge>
            <Badge colorScheme="success">Success</Badge>
            <Badge colorScheme="error">Error</Badge>
            <Badge colorScheme="warning">Warning</Badge>
          </Row>
          <Row label="Solid">
            <Badge variant="solid" colorScheme="brand">Brand</Badge>
            <Badge variant="solid" colorScheme="success">Success</Badge>
            <Badge variant="solid" colorScheme="error">Error</Badge>
          </Row>
          <Row label="Outline">
            <Badge variant="outline" colorScheme="brand">Brand</Badge>
            <Badge variant="outline" colorScheme="success">Active</Badge>
            <Badge variant="outline" colorScheme="error">Failed</Badge>
            <Badge variant="outline" colorScheme="warning">Pending</Badge>
          </Row>
        </Section>

        {/* Inputs */}
        <Section title="Input">
          <div style={{ maxWidth: "400px" }}>
            <VStack gap={4}>
              <Input
                label="Email address"
                placeholder="you@company.com"
                type="email"
                helperText="We'll never share your email."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                id="email-input"
              />
              <Input
                label="Password"
                placeholder="Min. 8 characters"
                type="password"
                id="pw-input"
              />
              <Input
                label="Invalid state"
                placeholder="Bad input"
                isInvalid
                errorText="This field is required."
                id="invalid-input"
              />
              <Input
                label="Filled variant"
                placeholder="Filled style"
                variant="filled"
                id="filled-input"
              />
              <Input
                label="Disabled"
                placeholder="Can't edit"
                isDisabled
                id="disabled-input"
              />
            </VStack>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Card">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--ds-space-4)" }}>
            <Card variant="flat">
              <Card.Header>
                <Text variant="heading" size="md">Flat Card</Text>
              </Card.Header>
              <Card.Body>
                <Text color="secondary" size="sm">No shadow, just a border. Clean and minimal.</Text>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="ghost" colorScheme="neutral">Cancel</Button>
                <Button size="sm">Save</Button>
              </Card.Footer>
            </Card>
            <Card variant="raised">
              <Card.Header>
                <HStack justify="between">
                  <Text variant="heading" size="md">Raised Card</Text>
                  <Badge colorScheme="success">Active</Badge>
                </HStack>
              </Card.Header>
              <Card.Body>
                <Text color="secondary" size="sm">Medium shadow for elevated surfaces like dialogs or panels.</Text>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="outline" colorScheme="error">Delete</Button>
                <Button size="sm">Edit</Button>
              </Card.Footer>
            </Card>
            <Card variant="elevated">
              <Card.Header>
                <Text variant="heading" size="md">Elevated Card</Text>
              </Card.Header>
              <Card.Body>
                <Text color="secondary" size="sm">Strong shadow for floating elements like popovers.</Text>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" colorScheme="brand">Learn more →</Button>
              </Card.Footer>
            </Card>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Text">
          <VStack gap={3}>
            <Text variant="heading" size="4xl">Heading 4xl</Text>
            <Text variant="heading" size="3xl">Heading 3xl</Text>
            <Text variant="heading" size="2xl">Heading 2xl</Text>
            <Text variant="heading" size="xl">Heading xl</Text>
            <Text variant="heading" size="lg">Heading lg</Text>
            <Text variant="body" size="md">Body text — the primary reading size for most content.</Text>
            <Text variant="body" size="sm" color="secondary">Secondary text — slightly smaller and muted for supporting copy.</Text>
            <Text variant="caption" size="xs" color="muted">Caption / muted — timestamps, labels, helper text.</Text>
            <Text variant="code">const theme = useTheme()</Text>
          </VStack>
        </Section>

        {/* Modal */}
        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
            <Modal.Header onClose={() => setModalOpen(false)}>
              Confirm action
            </Modal.Header>
            <Modal.Body>
              <VStack gap={4}>
                <Text color="secondary">
                  Are you sure you want to publish this token collection? This will make the changes
                  available to all team members immediately.
                </Text>
                <Input placeholder="Type CONFIRM to proceed" id="confirm-input" />
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" colorScheme="neutral" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button colorScheme="brand" onClick={() => setModalOpen(false)}>Publish</Button>
            </Modal.Footer>
          </Modal>
        </Section>

      </Box>
    </div>
  );
}
